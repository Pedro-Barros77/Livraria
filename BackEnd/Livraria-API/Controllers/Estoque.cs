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
    public class EstoqueController : ControllerBase
    {
        private readonly LivrariaContext _context;

        public EstoqueController(LivrariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Estoque> Get()
        {
            return _context.Estoques;
        }

        [HttpPut]
        public Estoque GetByID(int id)
        {
            return _context.Estoques.FirstOrDefault(Est => Est.ID == id);
        }

        [HttpPost]
        public String Post()
        {
            return "Exemplo de Post";
        }
    }
}
