using Microsoft.EntityFrameworkCore;
using TestApp.DataAccess.Contexts;
using TestApp.DataAccess.Entities;
using Microsoft.AspNetCore.Identity;

namespace TestApp.Business.Services;

public class CustomerService
{
    private readonly AppDbContext _context;

    public CustomerService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Customer> RegisterCustomerAsync(Customer customer)
    {
        var usernameExists = await _context.Customers
            .AnyAsync(c => c.Username == customer.Username);

        if (usernameExists)
        {
            throw new Exception("Username already exists.");
        }

        var passwordHasher = new PasswordHasher<Customer>();

        customer.PasswordHash = passwordHasher.HashPassword(
            customer,
            customer.PasswordHash);

        customer.JoinDate = DateTime.Now;

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return customer;
    }

    public async Task<Customer?> LoginCustomerAsync(string username, string password)
    {
        var customer = await _context.Customers
            .FirstOrDefaultAsync(c => c.Username == username);

        if (customer == null)
        {
            return null;
        }

        var passwordHasher = new PasswordHasher<Customer>();

        var result = passwordHasher.VerifyHashedPassword(
            customer,
            customer.PasswordHash,
            password);

        if (result == PasswordVerificationResult.Failed)
        {
            return null;
        }

        return customer;
    }
}