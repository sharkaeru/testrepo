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

    // helper method to not return the password hash in the response
    private static CustomerResponse ToCustomerResponse(Customer customer)
    {
        return new CustomerResponse
        {
            Id = customer.Id,
            Username = customer.Username,
            FirstName = customer.FirstName,
            LastName = customer.LastName,
            Email = customer.Email,
            JoinDate = customer.JoinDate,
            Birthdate = customer.Birthdate,
            Address = customer.Address,
            City = customer.City,
            State = customer.State,
            Zip = customer.Zip
        };
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

            return Ok(ToCustomerResponse(createdCustomer));
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

        return Ok(ToCustomerResponse(customer));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var customer = await _customerService.GetCustomerByIdAsync(id);

        if (customer == null)
        {
            return NotFound("Customer not found.");
        }

        return Ok(ToCustomerResponse(customer));
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
    string? sortBy,
    string? sortDirection,
    string? filter,
    int pageNumber = 1,
    int pageSize = 10)
    {
        if (pageNumber < 1)
        {
            pageNumber = 1;
        }

        if (pageSize < 1)
        {
            pageSize = 10;
        }

        if (pageSize > 100)
        {
            pageSize = 100;
        }

        var result = await _customerService.GetAllCustomersAsync(
            sortBy,
            sortDirection,
            filter,
            pageNumber,
            pageSize);

        var response = new PagedResponse<CustomerResponse>
        {
            Items = result.Items
                .Select(c => ToCustomerResponse(c))
                .ToList(),

            TotalCount = result.TotalCount,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling(result.TotalCount / (double)pageSize)
        };

        return Ok(response);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search(string searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
        {
            return BadRequest("Search term is required.");
        }

        var customers = await _customerService.SearchCustomersAsync(searchTerm);

        var response = customers
            .Select(c => ToCustomerResponse(c))
            .ToList();

        return Ok(response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateCustomerRequest request)
    {
        try
        {
            var updatedCustomer = new Customer
            {
                Username = request.Username,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Birthdate = request.Birthdate,
                Address = request.Address,
                City = request.City,
                State = request.State,
                Zip = request.Zip
            };

            var customer = await _customerService.UpdateCustomerAsync(id, updatedCustomer);

            if (customer == null)
            {
                return NotFound("Customer not found.");
            }

            return Ok(ToCustomerResponse(customer));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}/password")]
    public async Task<IActionResult> UpdatePassword(int id, UpdatePasswordRequest request)
    {
        var success = await _customerService.UpdatePasswordAsync(
            id,
            request.CurrentPassword,
            request.NewPassword);

        if (!success)
        {
            return BadRequest("Customer not found or current password is incorrect.");
        }

        return Ok("Password updated successfully.");
    }

}