"use client";

import { useEffect, useState } from "react";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: string; // todo: number?
  phoneNumber: string;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data as Advocate[]);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const checkSimilar = (s: any, searchTerm: string) => {
    switch (typeof s) {
      case "string":
        return s.toLowerCase().includes(searchTerm.toLowerCase());
      case "number":
        return s.toString().toLowerCase().includes(searchTerm.toLowerCase());
      case "object":
        if (Array.isArray(s)) {
          for (const attr in s) {
            if (checkSimilar(s[attr], searchTerm)) {
              return true;
            }
          }
        }
      default:
        return false;
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      for (const attr in advocate) {
        if (checkSimilar(advocate[attr], searchTerm)) {
          return true;
        }
      }
      return false;
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    setFilteredAdvocates(advocates);
    setSearchTerm("");
  };

  function sortTable(n) {
    // borrowed from W3
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("table-1");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  return (
    <main style={{ margin: "24px" }}>
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl tracking-tight text-slate-900 sm:text-4xl">
          Solace Advocates
        </h1>
      </header>

      <br />
      <br />

      <div>
        <p className="text-2xl">Search</p>
        <input
          id="search-box"
          style={{ border: "1px solid black" }}
          onChange={onChange}
        />
        <button
          className="focus:outline-black text-white text-sm py-2.5 px-4 mx-4 border-b-4 border-blue-600 bg-blue-500 hover:bg-blue-400"
          onClick={onClick}
        >
          Reset
        </button>
      </div>
      <br />
      <br />
      <table
        id="table-1"
        className="w-full bg-white shadow-md rounded-lg border border-gray-200"
      >
        <thead>
          <tr className="border-b">
            <th
              onClick={() => sortTable(0)}
              className="px-6 py-4 text-left text-gray-600 font-medium"
            >
              First Name
            </th>
            <th
              onClick={() => sortTable(1)}
              className="px-6 py-4 text-left text-gray-600 font-medium"
            >
              Last Name
            </th>
            <th
              onClick={() => sortTable(2)}
              className="px-6 py-4 text-left text-gray-600 font-medium"
            >
              City
            </th>
            <th
              onClick={() => sortTable(3)}
              className="px-6 py-4 text-left text-gray-600 font-medium"
            >
              Degree
            </th>
            <th
              onClick={() => sortTable(4)}
              className="px-6 py-4 text-left text-gray-600 font-medium"
            >
              Specialties
            </th>
            <th
              onClick={() => sortTable(5)}
              className="px-6 py-4 text-left text-gray-600 font-medium"
            >
              Years of Experience
            </th>
            <th
              onClick={() => sortTable(6)}
              className="px-6 py-4 text-left text-gray-600 font-medium"
            >
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, key) => {
            return (
              <tr className="border-b" key={key}>
                <td className="px-6 py-4">{advocate.firstName}</td>
                <td className="px-6 py-4">{advocate.lastName}</td>
                <td className="px-6 py-4">{advocate.city}</td>
                <td className="px-6 py-4">{advocate.degree}</td>
                <td className="px-6 py-4">
                  {advocate.specialties.map((s, key) => (
                    <div key={key}>{s}</div>
                  ))}
                </td>
                <td className="px-6 py-4">{advocate.yearsOfExperience}</td>
                <td className="px-6 py-4">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
