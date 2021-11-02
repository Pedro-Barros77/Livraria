using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Livraria_API.Models
{
    public class ItemVenda
    {
        public int ID { get; set; }

        public int QtdVenda { get; set; } 

        [ForeignKey("Venda")]
        public int VendaID { get; set; }
        public virtual Venda Venda { get; set; }

        [ForeignKey("Livro")]
        public int LivroID { get; set; }

        public virtual Livro Livro { get; set; }
    }
}