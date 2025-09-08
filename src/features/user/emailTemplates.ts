export function bookingConfirmationTemplate(result: any) {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #ff3d00; color: #fff; padding: 20px; text-align: center;">
          <h2>🎬 Movie Booking Confirmed!</h2>
        </div>
        <div style="padding: 20px; color: #333;">
          <p>Hi <strong>${result.user.firstName}</strong>,</p>
          <p>Your ticket for <strong>${result.showtime.movie.title}</strong> is confirmed!</p>
          <p><strong>Date:</strong> ${result.showtime.date}</p>
          <p><strong>Time:</strong> ${result.showtime.showTime}</p>
        </div>
      </div>
    </div>
  `;
}


export function bookingCancellationTemplate(result: any) {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #ff3d00; color: #fff; padding: 20px; text-align: center;">
          <h2>❌ Movie Booking Cancelled</h2>
        </div>
        <div style="padding: 20px; color: #333;">
          <p>Hi <strong>${result.user.firstName}</strong>,</p>
          <p>Your booking has been successfully cancelled.</p>
          <p>We hope to see you soon for another show!</p>
        </div>
      </div>
    </div>
  `;
}
