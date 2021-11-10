using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Livraria_API.Data;
using Livraria_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Net;
using Microsoft.AspNetCore.Http;

namespace Livraria_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FornecedorController : ControllerBase
    {
        private readonly LivrariaContext _context;

        public FornecedorController(LivrariaContext context)
        {
            _context = context;
        }
        
        private bool FornecedorExists(int id)
        {
            return _context.Fornecedores.Any(forn => forn.ID == id);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fornecedor>>> GetFornecedoreses()
        {
            return await _context.Fornecedores.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Fornecedor>> GetFornecedor(int id)
        {
            var fornecedor = await _context.Fornecedores.FindAsync(id);

            if (fornecedor == null)
            {
                return NotFound();
            }

            return fornecedor;
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutFornecedor(int id, Fornecedor fornecedor)
        {
            if (id != fornecedor.ID)
            {
                return BadRequest("ID do parâmetro diferente do ID do FormData");
            }

            if(!FornecedorExists(id)){
                return NotFound("O Fornecedor de ID informado não existe");
            }

            _context.Entry(fornecedor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FornecedorExists(id))
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
        public async Task<ActionResult> PostFornecedor(Fornecedor fornecedor)
        {
            try
            {
                _context.Fornecedores.Add(fornecedor);
                await _context.SaveChangesAsync();

                return Ok(new { id = fornecedor.ID });
                //return CreatedAtAction("GetLivro", new { id = livro.ID }, livro);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFornecedor(int id)
        {
            var fornecedor = await _context.Fornecedores.FindAsync(id);
            if (fornecedor == null)
            {
                return NotFound();
            }

            _context.Fornecedores.Remove(fornecedor);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
