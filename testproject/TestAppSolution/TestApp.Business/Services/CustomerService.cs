using Microsoft.EntityFrameworkCore;
using TestApp.DataAccess.Contexts;
using TestApp.DataAccess.Entities;
using Microsoft.AspNetCore.Identity;
using TestApp.Business.Models;

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

    public async Task<Customer?> GetCustomerByIdAsync(int id)
    {
        return await _context.Customers
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<PagedResult<Customer>> GetAllCustomersAsync(
    string? sortBy,
    string? sortDirection,
    string? filter,
    int pageNumber,
    int pageSize)
    {
        var query = _context.Customers.AsQueryable();

        if (!string.IsNullOrWhiteSpace(filter))
        {
            query = query.Where(c =>
                c.Username.Contains(filter) ||
                c.FirstName.Contains(filter) ||
                c.LastName.Contains(filter) ||
                c.Email.Contains(filter) ||
                c.Address.Contains(filter) ||
                c.City.Contains(filter) ||
                c.State.Contains(filter) ||
                c.Zip.Contains(filter));
        }

        var totalCount = await query.CountAsync();

        bool descending = sortDirection?.ToLower() == "desc";

        query = sortBy?.ToLower() switch
        {
            "id" => descending ? query.OrderByDescending(c => c.Id) : query.OrderBy(c => c.Id),
            "username" => descending ? query.OrderByDescending(c => c.Username) : query.OrderBy(c => c.Username),
            "firstname" => descending ? query.OrderByDescending(c => c.FirstName) : query.OrderBy(c => c.FirstName),
            "lastname" => descending ? query.OrderByDescending(c => c.LastName) : query.OrderBy(c => c.LastName),
            "email" => descending ? query.OrderByDescending(c => c.Email) : query.OrderBy(c => c.Email),
            "joindate" => descending ? query.OrderByDescending(c => c.JoinDate) : query.OrderBy(c => c.JoinDate),
            "birthdate" => descending ? query.OrderByDescending(c => c.Birthdate) : query.OrderBy(c => c.Birthdate),
            "address" => descending ? query.OrderByDescending(c => c.Address) : query.OrderBy(c => c.Address),
            "city" => descending ? query.OrderByDescending(c => c.City) : query.OrderBy(c => c.City),
            "state" => descending ? query.OrderByDescending(c => c.State) : query.OrderBy(c => c.State),
            "zip" => descending ? query.OrderByDescending(c => c.Zip) : query.OrderBy(c => c.Zip),

            _ => query.OrderBy(c => c.LastName).ThenBy(c => c.FirstName)
        };

        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResult<Customer>
        {
            Items = items,
            TotalCount = totalCount
        };
    }

    public async Task<List<Customer>> SearchCustomersAsync(string searchTerm)
    {
        return await _context.Customers
            .Where(c =>
                c.Username.Contains(searchTerm) ||
                c.FirstName.Contains(searchTerm) ||
                c.LastName.Contains(searchTerm) ||
                c.Email.Contains(searchTerm) ||
                c.City.Contains(searchTerm) ||
                c.State.Contains(searchTerm))
            .OrderBy(c => c.LastName)
            .ThenBy(c => c.FirstName)
            .ToListAsync();
    }

    public async Task<Customer?> UpdateCustomerAsync(int id, Customer updatedCustomer)
    {
        var existingCustomer = await _context.Customers
            .FirstOrDefaultAsync(c => c.Id == id);

        if (existingCustomer == null)
        {
            return null;
        }

        var usernameExists = await _context.Customers
            .AnyAsync(c => c.Username == updatedCustomer.Username && c.Id != id);

        if (usernameExists)
        {
            throw new Exception("Username already exists.");
        }

        existingCustomer.Username = updatedCustomer.Username;
        existingCustomer.FirstName = updatedCustomer.FirstName;
        existingCustomer.LastName = updatedCustomer.LastName;
        existingCustomer.Email = updatedCustomer.Email;
        existingCustomer.Birthdate = updatedCustomer.Birthdate;
        existingCustomer.Address = updatedCustomer.Address;
        existingCustomer.City = updatedCustomer.City;
        existingCustomer.State = updatedCustomer.State;
        existingCustomer.Zip = updatedCustomer.Zip;

        await _context.SaveChangesAsync();

        return existingCustomer;
    }

    public async Task<bool> UpdatePasswordAsync(
    int id,
    string currentPassword,
    string newPassword)
    {
        var customer = await _context.Customers
            .FirstOrDefaultAsync(c => c.Id == id);

        if (customer == null)
        {
            return false;
        }

        var passwordHasher = new PasswordHasher<Customer>();

        var result = passwordHasher.VerifyHashedPassword(
            customer,
            customer.PasswordHash,
            currentPassword);

        if (result == PasswordVerificationResult.Failed)
        {
            return false;
        }

        customer.PasswordHash = passwordHasher.HashPassword(customer, newPassword);

        await _context.SaveChangesAsync();

        return true;
    }
}