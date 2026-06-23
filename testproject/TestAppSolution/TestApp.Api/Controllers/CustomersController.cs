using Microsoft.AspNetCore.Mvc;
using TestApp.Api.Models;
using TestApp.Business.Services;
using TestApp.DataAccess.Entities;

namespace TestApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly CustomerService _customerService;

    public CustomersController(CustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterCustomerRequest request)
    {
        try
        {
            var customer = new Customer
            {
                Username = request.Username,
                PasswordHash = request.Password, // temporary; we'll hash next
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Birthdate = request.Birthdate,
                Address = request.Address,
                City = request.City,
                State = request.State,
                Zip = request.Zip
            };

            var createdCustomer = await _customerService.RegisterCustomerAsync(customer);

            return Ok(createdCustomer);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginCustomerRequest request)
    {
        var customer = await _customerService.LoginCustomerAsync(
            request.Username,
            request.Password);

        if (customer == null)
        {
            return Unauthorized("Invalid username or password.");
        }

        return Ok(customer);
    }
}