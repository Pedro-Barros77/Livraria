using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Livraria_API.Data.Migrations
{
    public partial class RemovedFiles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileData",
                table: "Livros");

            migrationBuilder.DropColumn(
                name: "FileExt",
                table: "Livros");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Livros");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "FileData",
                table: "Livros",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileExt",
                table: "Livros",
                type: "nvarchar(5)",
                maxLength: 5,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Livros",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);
        }
    }
}
