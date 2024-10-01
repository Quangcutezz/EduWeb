using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace course_edu_api.Migrations
{
    /// <inheritdoc />
    public partial class uppost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blogs_Users_UserId",
                table: "Blogs");

            migrationBuilder.DropForeignKey(
                name: "FK_SubItemPost_Blogs_PostId",
                table: "SubItemPost");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Blogs",
                table: "Blogs");

            migrationBuilder.RenameTable(
                name: "Blogs",
                newName: "Post");

            migrationBuilder.RenameIndex(
                name: "IX_Blogs_UserId",
                table: "Post",
                newName: "IX_Post_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Post",
                table: "Post",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Users_UserId",
                table: "Post",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubItemPost_Post_PostId",
                table: "SubItemPost",
                column: "PostId",
                principalTable: "Post",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Post_Users_UserId",
                table: "Post");

            migrationBuilder.DropForeignKey(
                name: "FK_SubItemPost_Post_PostId",
                table: "SubItemPost");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Post",
                table: "Post");

            migrationBuilder.RenameTable(
                name: "Post",
                newName: "Blogs");

            migrationBuilder.RenameIndex(
                name: "IX_Post_UserId",
                table: "Blogs",
                newName: "IX_Blogs_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Blogs",
                table: "Blogs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Blogs_Users_UserId",
                table: "Blogs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubItemPost_Blogs_PostId",
                table: "SubItemPost",
                column: "PostId",
                principalTable: "Blogs",
                principalColumn: "Id");
        }
    }
}
