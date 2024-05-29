import "./Home.css";

function Home() {
  return (
    <div className='articleHome'>
     
         <p className=" lead-home">
         The blog app features sign-up and sign-in functionalities for users to create accounts, with authors gaining access to post management tools including creating, editing, deleting, and restoring articles. Authors are presented with a dashboard upon login where they can manage their posts, with users able to view all published articles. Authors have elevated permissions, while regular users can only interact with published content. Deleted posts are moved to a trash bin for potential restoration. Security measures including HTTPS, encryption, and input validation are implemented, alongside responsive design for accessibility across devices. Optional features like comments and interactions enhance user engagement and community building.
      </p>
    </div>
  );
}

export default Home;