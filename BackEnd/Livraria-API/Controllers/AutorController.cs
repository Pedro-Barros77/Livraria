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
    public class AutorController : ControllerBase
    {
        private readonly LivrariaContext _context;

        public AutorController(LivrariaContext context)
        {
            _context = context;
        }

        private bool AutorExists(int id)
        {
            return _context.Autores.Any(aut => aut.ID == id);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Autor>>> GetAutores()
        {
            return await _context.Autores.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Autor>> GetAutor(int id)
        {
            var autor = await _context.Autores.FindAsync(id);

            if (autor == null)
            {
                return NotFound();
            }

            return autor;
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutAutor(int id, Autor autor)
        {
            if (id != autor.ID)
            {
                return BadRequest("ID do parâmetro diferente do ID do FormData");
            }

            if(!AutorExists(id)){
                return NotFound("O Autor de ID informado não existe");
            }

            _context.Entry(autor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AutorExists(id))
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
        public async Task<ActionResult> PostAutor(Autor autor)
        {
            try
            {
                _context.Autores.Add(autor);
                await _context.SaveChangesAsync();

                return Ok(new { id = autor.ID });
                //return CreatedAtAction("GetLivro", new { id = livro.ID }, livro);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message, StackTrace = ex.StackTrace });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAutor(int id)
        {
            var autor = await _context.Autores.FindAsync(id);
            if (autor == null)
            {
                return NotFound();
            }

            if(_context.Livros.Any(x => x.AutorID == id)){
                foreach (var livro in _context.Livros.Where(
                    x => x.AutorID == id
                ))
                {
                    livro.AutorID = null;
                    livro.Autor = null;
                    _context.Entry(livro).State = EntityState.Modified;
                }
            }

            _context.Autores.Remove(autor);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
