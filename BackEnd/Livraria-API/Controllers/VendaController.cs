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
    public class VendaController : ControllerBase
    {
        private readonly LivrariaContext _context;

        public VendaController(LivrariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Venda> Get()
        {
            return _context.Vendas;
        }

        [HttpPut]
        public Venda GetByID(int id)
        {
            return _context.Vendas.FirstOrDefault(Vend => Vend.ID == id);
        }

        [HttpPost]
        public String Post()
        {
            return "Exemplo de Post";
        }
    }
}
