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
    public class ItemVendaController : ControllerBase
    {
        private readonly LivrariaContext _context;

        public ItemVendaController(LivrariaContext context)
        {
            _context = context;
        }

        private bool ItemVendaExists(int id)
        {
            return _context.ItemVendas.Any(aut => aut.ID == id);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemVenda>>> GetItens()
        {
            return await _context.ItemVendas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemVenda>> GetItemVenda(int id)
        {
            var itemVenda = await _context.ItemVendas.FindAsync(id);

            if (itemVenda == null)
            {
                return NotFound();
            }

            return itemVenda;
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutItemVenda(int id, ItemVenda itemVenda)
        {
            if (id != itemVenda.ID)
            {
                return BadRequest("ID do parâmetro diferente do ID do FormData");
            }

            if(!ItemVendaExists(id)){
                return NotFound("O ItemVenda de ID informado não existe");
            }

            _context.Entry(itemVenda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemVendaExists(id))
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
        public async Task<ActionResult> PostItemVenda(ItemVenda itemVenda)
        {
            try
            {
                _context.ItemVendas.Add(itemVenda);
                await _context.SaveChangesAsync();

                return Ok(new { id = itemVenda.ID });
                //return CreatedAtAction("GetLivro", new { id = livro.ID }, livro);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemVenda(int id)
        {
            var itemVenda = await _context.ItemVendas.FindAsync(id);
            if (itemVenda == null)
            {
                return NotFound();
            }

            _context.ItemVendas.Remove(itemVenda);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
