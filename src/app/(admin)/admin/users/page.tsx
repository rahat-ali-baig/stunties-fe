'use client';

import { useState } from "react";
import MetricsSlider from "@/components/addons/MetricsSlider";
import { userCards } from "@/constants";
import { RiUserSmileFill } from "react-icons/ri";
import PageHeader from "@/components/addons/PageHeader";
import LocationFilterSection from "@/components/usersManagement/LocationFilterSection";
import Users from "@/components/usersManagement/Users";

const UserManagment = () => {
  const [appliedFilters, setAppliedFilters] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleApplyFilters = (filters: any) => {
    console.log("Filters applied:", filters);
    setAppliedFilters(filters);
  };

  return (
    <div className="h-[calc(100vh-120px)] w-full overflow-y-auto p-4">
      {/* <PageHeader
        title="Users Management"
        subtitle="Manage and verify user accounts and permissions"
      /> */}

      <MetricsSlider cards={userCards} />
      <LocationFilterSection
        onApplyFilters={handleApplyFilters}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />
      <Users filters={appliedFilters} searchQuery={searchQuery} />
    </div>
  );
};

export default UserManagment;