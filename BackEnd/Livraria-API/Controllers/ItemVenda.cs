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
    public class ItemVendaController : ControllerBase
    {
        private readonly LivrariaContext _context;

        public ItemVendaController(LivrariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<ItemVenda> Get()
        {
            return _context.ItemVendas;
        }

        [HttpPut]
        public ItemVenda GetByID(int id)
        {
            return _context.ItemVendas.FirstOrDefault(ItVen => ItVen.ID == id);
        }

        [HttpPost]
        public String Post()
        {
            return "Exemplo de Post";
        }
    }
}
