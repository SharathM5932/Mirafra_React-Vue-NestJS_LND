import React from "react";

import type { ProfileCardProps } from "../../types/user";

import "../../style/profileCard.css";

const ProfileCard: React.FC<ProfileCardProps> = ({ title, description }) => {
  return (
    <section className="profile_card">
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
};

export default ProfileCard;
