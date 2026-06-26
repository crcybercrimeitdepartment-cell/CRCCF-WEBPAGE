
// The ProfileCard component receives 2 props:
// - name: The person's full name (e.g., "John Doe")
// - role: Their job title or position (e.g., "Lead Officer")
const ProfileCard = ({ name, role }) => (
  // --- MAIN CARD CONTAINER ---
  // flex-col & items-center: Stacks everything vertically and centers it in the middle.
  // hover:shadow-md: Adds a slightly larger drop shadow when the mouse hovers over the card.
  <div className="bg-bgCard p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
    // --- AVATAR CIRCLE --- // w-20 h-20 rounded-full: Creates a perfect
    80x80px circle. // border-4 border-white shadow-sm: Gives it a thick white
    border so it "pops" out from the background.
    <div className="w-20 h-20 bg-lightBlue rounded-full mb-4 flex items-center justify-center text-primary text-2xl font-bold border-4 border-white shadow-sm">
      {/* This takes the 'name' prop and extracts just the very first letter to use as the avatar icon */}
      {name.charAt(0)}
    </div>
    // --- TEXT CONTENT --- // The person's name, styled as a bold heading
    <h4 className="font-bold text-textHeading text-lg">{name}</h4>
    // The person's role/title, given a slightly muted color and a bottom margin
    to space out the button
    <p className="text-sm text-textSec mb-5 font-medium">{role}</p>
    // --- CONTACT BUTTON --- // bg-primary-gradient: Uses your custom blue
    gradient from index.css. // w-full: Makes the button stretch across the
    entire width of the card. // hover:-translate-y... / hover:shadow-lg: You
    could add these to make the button lift up when hovered!
    <button className="bg-primary-gradient text-white px-6 py-2.5 rounded-xl text-sm font-semibold w-full hover:shadow-lg hover:opacity-90 transition-all">
      Contact
    </button>
  </div>
);

export default ProfileCard;
