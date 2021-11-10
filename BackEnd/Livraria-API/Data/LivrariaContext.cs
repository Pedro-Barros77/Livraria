using System;
using Microsoft.EntityFrameworkCore;
using Livraria_API.Models;

namespace Livraria_API.Data
{
    public class LivrariaContext : DbContext
    {
        public LivrariaContext(DbContextOptions<LivrariaContext> options) : base(options){}
        
        public DbSet<Livro> Livros {get;set;}
        public DbSet<Autor> Autores {get;set;}
        public DbSet<Fornecedor> Fornecedores {get;set;}
        public DbSet<Venda> Vendas {get;set;}
        public DbSet<ItemVenda> ItemVendas {get;set;}
        public DbSet<Estoque> Estoques {get;set;}
    }
}