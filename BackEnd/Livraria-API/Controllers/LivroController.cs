using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Livraria_API.Data;
using Livraria_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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

        [HttpGet]
        public IEnumerable<Livro> Get()
        {
            return _context.Livros;
        }

        [HttpPut("{id}")]
        public IActionResult GetByID(int id,[FromBody]Livro liv)
        {
            var result = _context.Livros.FirstOrDefault(item => item.ID == id);
            if(result == default)
            {
                return NotFound();
            }
            else
            {
                result.Titulo = liv.Titulo;
                result.Valor = float.Parse(liv.Valor.ToString());
                result.AutorID = int.Parse(liv.AutorID.ToString());
                result.FornecedorID = int.Parse(liv.FornecedorID.ToString());
                _context.SaveChanges();
                return Ok("{\"resultado\": \"Alterado com sucesso: "+id+"\"}");
            }
        }

        [HttpPost]
        public String Post()
        {
            return "Exemplo de Post";
        }
    }
}
