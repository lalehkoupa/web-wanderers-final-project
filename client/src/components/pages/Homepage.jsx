import Hero from "../molecules/Hero.jsx";
import Classes from "../molecules/Classes.jsx";

const Homepage = () => {
  return (
    <div>
      <Hero text="Can You Help?" />
      <div className="container-fluid text-center bg-yellow_green mt-5 mb-3">
        <p className="pb-2 pt-2 h3 mb-4">
          New venue: Stoke Newington School, Clissold Road N16 9EX
        </p>
      </div>
      <div className="container col-10 pt-5">
        <p>
          There are Lots of ways you can get involved here at AKWAABA. You can
          help as a kitchen supervisor, driver, etc. You can choose suitable
          roles and time from available times and slots below.
        </p>
      </div>
      <Classes />
    </div>
  );
};

export default Homepage;
