using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Livraria_API.Data;
using Livraria_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Livraria_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstoqueController : ControllerBase
    {
        private readonly LivrariaContext _context;

        public EstoqueController(LivrariaContext context)
        {
            _context = context;
        }

        private bool EstoqueExists(int id)
        {
            return _context.Estoques.Any(est => est.ID == id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estoque>>> GetEstoques()
        {
            return await _context.Estoques.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Estoque>> GetEstoque(int id)
        {
            var estoque = await _context.Estoques.FindAsync(id);

            if (estoque == null)
            {
                return NotFound();
            }

            return estoque;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstoque(int id, Estoque estoque)
        {
            if (id != estoque.ID)
            {
                return BadRequest("ID do parâmetro diferente do ID do FormData");
            }

            if (!EstoqueExists(id))
            {
                return NotFound("O Estoque de ID informado não existe");
            }

            _context.Entry(estoque).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstoqueExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> PostEstoque(Estoque estoque)
        {
            try
            {
                if (!_context.Livros.Any(liv => liv.ID == estoque.LivroID))
                {
                    return NotFound("Livro com ID informado não encontrado");
                }

                if (estoque.Quantidade <= 0)
                {
                    return BadRequest("Quantidade menor ou igual a zero");
                }

                Livro livro = _context.Livros.Find(estoque.LivroID);

                livro.QuantidadeTotal += estoque.Quantidade;

                _context.Entry(livro).State = EntityState.Modified;

                estoque.DataRegistro = DateTime.Now;

                _context.Estoques.Add (estoque);
                await _context.SaveChangesAsync();

                return Ok(new { id = estoque.ID });
                //return CreatedAtAction("GetLivro", new { id = livro.ID }, livro);
            }
            catch (Exception ex)
            {
                return BadRequest(new {
                    Message = ex.Message,
                    StackTrace = ex.StackTrace
                });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstoque(int id)
        {
            var estoque = await _context.Estoques.FindAsync(id);
            if (estoque == null)
            {
                return NotFound();
            }

            if (!_context.Livros.Any(liv => liv.ID == estoque.LivroID))
            {
                return NotFound("Livro com ID informado não encontrado");
            }

            if (estoque.Quantidade <= 0)
            {
                return BadRequest("Quantidade menor ou igual a zero");
            }

            Livro livro = _context.Livros.Find(estoque.LivroID);

            if (livro.QuantidadeTotal >= estoque.Quantidade)
            {
                livro.QuantidadeTotal -= estoque.Quantidade;
            }
            else
            {
                livro.QuantidadeTotal = 0;
            }
            _context.Entry(livro).State = EntityState.Modified;

            _context.Estoques.Remove (estoque);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
