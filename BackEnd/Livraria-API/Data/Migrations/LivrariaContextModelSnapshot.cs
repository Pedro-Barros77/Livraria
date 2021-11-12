﻿// <auto-generated />
using System;
using Livraria_API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Livraria_API.Data.Migrations
{
    [DbContext(typeof(LivrariaContext))]
    partial class LivrariaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Livraria_API.Models.Autor", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nome")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("ID");

                    b.ToTable("Autores");
                });

            modelBuilder.Entity("Livraria_API.Models.Estoque", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("DataRegistro")
                        .HasColumnType("datetime2");

                    b.Property<int>("LivroID")
                        .HasColumnType("int");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("LivroID");

                    b.ToTable("Estoques");
                });

            modelBuilder.Entity("Livraria_API.Models.Fornecedor", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Nome")
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("Telefone")
                        .HasMaxLength(11)
                        .HasColumnType("nvarchar(11)");

                    b.HasKey("ID");

                    b.ToTable("Fornecedores");
                });

            modelBuilder.Entity("Livraria_API.Models.ItemVenda", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LivroID")
                        .HasColumnType("int");

                    b.Property<int>("QtdVenda")
                        .HasColumnType("int");

                    b.Property<int>("VendaID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("LivroID");

                    b.HasIndex("VendaID");

                    b.ToTable("ItemVendas");
                });

            modelBuilder.Entity("Livraria_API.Models.Livro", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AutorID")
                        .HasColumnType("int");

                    b.Property<int?>("FornecedorID")
                        .HasColumnType("int");

                    b.Property<string>("ImageExt")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("MinQuantidade")
                        .HasColumnType("int");

                    b.Property<int>("QuantidadeTotal")
                        .HasColumnType("int");

                    b.Property<string>("Titulo")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<float>("Valor")
                        .HasColumnType("real");

                    b.HasKey("ID");

                    b.HasIndex("AutorID");

                    b.HasIndex("FornecedorID");

                    b.ToTable("Livros");
                });

            modelBuilder.Entity("Livraria_API.Models.Venda", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ContatoCliente")
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.Property<DateTime?>("DataVenda")
                        .HasColumnType("datetime2");

                    b.Property<string>("NomeCliente")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<int>("ValorTotal")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Vendas");
                });

            modelBuilder.Entity("Livraria_API.Models.Estoque", b =>
                {
                    b.HasOne("Livraria_API.Models.Livro", "Livro")
                        .WithMany()
                        .HasForeignKey("LivroID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Livro");
                });

            modelBuilder.Entity("Livraria_API.Models.ItemVenda", b =>
                {
                    b.HasOne("Livraria_API.Models.Livro", "Livro")
                        .WithMany()
                        .HasForeignKey("LivroID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Livraria_API.Models.Venda", "Venda")
                        .WithMany("ItemVenda")
                        .HasForeignKey("VendaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Livro");

                    b.Navigation("Venda");
                });

            modelBuilder.Entity("Livraria_API.Models.Livro", b =>
                {
                    b.HasOne("Livraria_API.Models.Autor", "Autor")
                        .WithMany("Livros")
                        .HasForeignKey("AutorID");

                    b.HasOne("Livraria_API.Models.Fornecedor", "Fornecedor")
                        .WithMany("Livros")
                        .HasForeignKey("FornecedorID");

                    b.Navigation("Autor");

                    b.Navigation("Fornecedor");
                });

            modelBuilder.Entity("Livraria_API.Models.Autor", b =>
                {
                    b.Navigation("Livros");
                });

            modelBuilder.Entity("Livraria_API.Models.Fornecedor", b =>
                {
                    b.Navigation("Livros");
                });

            modelBuilder.Entity("Livraria_API.Models.Venda", b =>
                {
                    b.Navigation("ItemVenda");
                });
#pragma warning restore 612, 618
        }
    }
}
