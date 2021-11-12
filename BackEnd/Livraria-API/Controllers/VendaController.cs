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
    public class VendaController : ControllerBase
    {
        private readonly LivrariaContext _context;

        public VendaController(LivrariaContext context)
        {
            _context = context;
        }

        private bool VendaExists(int id)
        {
            return _context.Vendas.Any(ven => ven.ID == id);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Venda>>> GetVendas()
        {
            return await _context.Vendas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Venda>> GetVenda(int id)
        {
            var venda = await _context.Vendas.FindAsync(id);

            if (venda == null)
            {
                return NotFound();
            }

            return venda;
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutVenda(int id, Venda venda)
        {
            if (id != venda.ID)
            {
                return BadRequest("ID do parâmetro diferente do ID do FormData");
            }

            if(!VendaExists(id)){
                return NotFound("A Venda de ID informado não existe");
            }

            _context.Entry(venda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendaExists(id))
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
        public async Task<ActionResult<Venda>> PostVenda(Venda venda)
        {
            try
            {
                _context.Vendas.Add(venda);
                await _context.SaveChangesAsync();

                return Ok(venda);
                //return CreatedAtAction("GetLivro", new { id = livro.ID }, livro);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenda(int id)
        {
            var venda = await _context.Vendas.FindAsync(id);
            if (venda == null)
            {
                return NotFound();
            }

            // if(_context.Livros.Any(x => x.AutorID == id)){
            //     foreach (var livro in _context.Livros.Where(
            //         x => x.AutorID == id
            //     ))
            //     {
            //         livro.AutorID = null;
            //         livro.Autor = null;
            //         _context.Entry(livro).State = EntityState.Modified;
            //     }
            // }

            _context.Vendas.Remove(venda);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
