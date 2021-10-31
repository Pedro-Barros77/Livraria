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

        [HttpPut]
        public Livro GetByID(int id)
        {
            return _context.Livros.FirstOrDefault(Liv => Liv.ID == id);
        }

        [HttpPost]
        public String Post()
        {
            return "Exemplo de Post";
        }
    }
}
