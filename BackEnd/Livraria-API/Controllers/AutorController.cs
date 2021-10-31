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
    public class AutorController : ControllerBase
    {
        private readonly LivrariaContext _context;

        public AutorController(LivrariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Autor> Get()
        {
            return _context.Autores;
        }

        [HttpPut]
        public Autor GetByID(int id)
        {
            return _context.Autores.FirstOrDefault(Aut => Aut.ID == id);
        }

        [HttpPost]
        public String Post()
        {
            return "Exemplo de Post";
        }
    }
}
