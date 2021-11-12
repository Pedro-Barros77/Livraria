using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Livraria_API.Models
{
    public class Venda
    {
        public int ID { get; set; }

        [MaxLength(30)]
        public string NomeCliente { get; set; }

        [MaxLength(80)]
        public string? ContatoCliente { get; set; }
        
        public DateTime? DataVenda { get; set; }
        
        public float ValorTotal { get; set; }

        public virtual ICollection<ItemVenda> ItemVenda { get; set; }
    }
}