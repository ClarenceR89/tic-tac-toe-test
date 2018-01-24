using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using three_t_backend.Models;

namespace three_t_backend.SignalRHubs
{
    public class MoveHub : Hub
    {
        public async Task Move(Move move)
        {
            await Clients.All.InvokeAsync("Move", move);
        }

        public async Task Win(bool win)
        {
            await Clients.All.InvokeAsync("Win", new { win = win });
        }
    }
}