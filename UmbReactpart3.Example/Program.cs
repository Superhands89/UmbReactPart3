using Vite.AspNetCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddViteServices(options =>
{
    // this should match the folder name where your React files are located
    options.Server.PackageDirectory = "clientapp";
    // Enable the automatic start of the Vite Development Server. The default value is false.
    options.Server.AutoRun = true;
    // If true, the react-refresh script will be injected before the vite client.
    options.Server.UseReactRefresh = true;
});

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddDeliveryApi()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();

app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

if (app.Environment.IsDevelopment())
{
    // Enable all required features to use the Vite Development Server.
    // Pass true if you want to use the integrated middleware.
    app.UseViteDevelopmentServer(true);
}

await app.RunAsync();
