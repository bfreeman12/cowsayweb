import React from "react";
import "../styles/about.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      <h4 className="header">About The Cow</h4>
      <p className="content">
        Cowsay is a program that generates ASCII pictures of a cow with a
        message. It was originally written in Perl by Tony Monroe in 1999, with
        the intention of providing a fun, lightweight tool for generating
        humorous text in terminal sessions.
        <br />
        <br /> Fortunes is a simple program that displays random poignant,
        inspirational, silly or snide phrases It was originally written in 1986
        as part of the BSD games package. Together, cowsay and fortunes have
        been used in countless terminal sessions, bringing a touch of humor and
        whimsy to the often serious world of command line interfaces.
        <br />
        <br />
        As a developer cowsay and fortunes have been my go-to meme tools for
        years. I have created a discord bot and numerous scripts to bring the
        cow to life. Now I have created this web app to share the joy of cowsay
        to any of those who want to indulge in the fun.
      </p>
    </div>
  );
};

export default AboutUs;
