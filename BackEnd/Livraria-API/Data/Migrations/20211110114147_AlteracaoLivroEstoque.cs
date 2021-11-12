using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Livraria_API.Data.Migrations
{
    public partial class AlteracaoLivroEstoque : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MinQuantidade",
                table: "Estoques");

            migrationBuilder.AddColumn<int>(
                name: "MinQuantidade",
                table: "Livros",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataVenda",
                table: "Estoques",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MinQuantidade",
                table: "Livros");

            migrationBuilder.DropColumn(
                name: "DataVenda",
                table: "Estoques");

            migrationBuilder.AddColumn<int>(
                name: "MinQuantidade",
                table: "Estoques",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
