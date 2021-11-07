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
using System.IO;

namespace Livraria_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LivroController : ControllerBase
    {
        private readonly LivrariaContext _context;

        public LivroController(LivrariaContext context)
        {
            _context = context;
        }

        private bool LivroExists(int id)
        {
            return _context.Livros.Any(liv => liv.ID == id);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Livro>>> GetLivros()
        {
            return await _context.Livros.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Livro>> GetLivro(int id)
        {
            var livro = await _context.Livros.FindAsync(id);

            if (livro == null)
            {
                return NotFound();
            }

            return livro;
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutLivro(int id, Livro livro)
        {
            if (id != livro.ID)
            {
                return BadRequest();
            }

            if(livro.AutorID ==0)
            {
                livro.AutorID = null;
                livro.Autor = null;
            }
            if(livro.FornecedorID ==0)
            {
                livro.FornecedorID = null;
                livro.Fornecedor = null;
            }

            _context.Entry(livro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LivroExists(id))
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
        public async Task<ActionResult<Livro>> PostLivro(Livro livro)
        {
            if(livro.AutorID ==0)
            {
                livro.AutorID = null;
                livro.Autor = null;
            }
            if(livro.FornecedorID ==0)
            {
                livro.FornecedorID = null;
                livro.Fornecedor = null;
            }

            _context.Livros.Add(livro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLivro", new { id = livro.ID }, livro);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLivro(int id)
        {
            var livro = await _context.Livros.FindAsync(id);
            if (livro == null)
            {
                return NotFound();
            }

            _context.Livros.Remove(livro);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // [HttpDelete("{ids}")]
        // public async Task<IActionResult> DeleteLivros(string ids)
        // {
        //     List<Livro> livros = new List<Livro>();
        //     foreach (var item in ids.Split(","))
        //     {
        //         livros.Add()
        //     }

        //     var livro = await _context.Livros.FindAsync(id);
        //     if (livro == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.Livros.Remove(livro);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }


    }
}
