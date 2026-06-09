import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";


export default function Navbar() {
  return (
    <div className="flex h-full items-stretch gap-6 py-8">
      <nav className="flex flex-col">
        <Link color="textSecondary" variant="h5" href="/">Ethan Chao</Link>
        <Link variant="h5" href="/experience">Experience</Link>
        <Link variant="h5" href="/projects">Projects</Link>
        <Link variant="h5" href="/curations">Curations</Link>
      </nav>

    

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "white",
          borderRightWidth: 1,
          alignSelf: "stretch",
        }}
      />
    </div>
  );
}