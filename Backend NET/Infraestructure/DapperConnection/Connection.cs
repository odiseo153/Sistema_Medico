using System.Data;
using System.Data.SqlClient;

namespace Infraestructure.DapperConnection
{
    public class Connection
    {
        private static SqlConnection db;
        private static string conexcion = "Server=odiseo\\ODISEO;Database=SistemaMedico;User Id=odiseo;Password=padomo153;TrustServerCertificate=True;";

        public static IDbConnection Open()
        {
            if (db == null)
            {
                db = new SqlConnection(conexcion);
            }

            if (db.State != ConnectionState.Open)
            {
                db.Open();
            }

            return db;
        }

        // Método para cerrar la conexión a la base de datos
        public static void Close()
        {
            if (db == null && db.State == ConnectionState.Open)
            {
                db.Close();
            }
        }
    }
}
