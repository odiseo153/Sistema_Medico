
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace Api
{
    public class GlobalHandlerException : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);

            }catch(Exception ex)
            {

                context.Response.StatusCode =(int)HttpStatusCode.InternalServerError;

                ProblemDetails problema = new()
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Type = "Error Interno del servidor",
                    Title = "Error Del Servidor",
                    Detail="No se pudo acceder por que hubo un error en el servidor"
            };

                string json = JsonSerializer.Serialize(problema);

                context.Response.ContentType = "application/json";

                await context.Response.WriteAsync(json);

            }
        }
    }
}
