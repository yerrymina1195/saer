// Sidebar.js
import React from 'react';
import { Link,} from 'react-router-dom';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";


export function DefaultSidebar() {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 rounded-none shadow-2xl shadow-yellow-300">
      <div className="mb-2 p-4 bg-custum-gold">
        <Typography variant="h5" color="blue-gray">

        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <Link to="/Dashboard" className="text-yellow-400 hover:text-yellow-500"> {/* Ajouter un lien vers la page Dashboard */}
              <PresentationChartBarIcon className="h-5 w-5" />
            </Link>
          </ListItemPrefix>
          <span onClick={() => window.location.href = '/Dashboard'} className="cursor-pointer">Dashboard</span>
        </ListItem>

        {/* Nouveaux éléments */}
        <ListItem>
          <ListItemPrefix>
            <Link to="/Liste" className="text-yellow-400 hover:text-yellow-500"> {/* Ajouter un lien vers la page Mes Sondages */}
              <ChartBarIcon className="h-5 w-5" />
            </Link>
          </ListItemPrefix>
          <span onClick={() => window.location.href = '/Liste'} className="cursor-pointer">Mes Sondages</span>
          
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <Link to="/DisplaySurvey" className="text-yellow-400 hover:text-yellow-500"> {/* Ajouter un lien vers la page Mes Résultats */}
              <Cog6ToothIcon className="h-5 w-5" />
            </Link>
          </ListItemPrefix>
          <span onClick={() => window.location.href = 'DisplaySurvey'} className="cursor-pointer">Mes Résultats</span>

          
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Link to="/inbox" className="text-yellow-400 hover:text-yellow-500"> {/* Ajouter un lien vers la page Inbox */}
              <InboxIcon className="h-5 w-5" />
            </Link>
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Link to="/profile" className="text-yellow-400 hover:text-yellow-500"> {/* Ajouter un lien vers la page Profile */}
              <UserCircleIcon className="h-5 w-5" />
            </Link>
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Link to="/logout" className="text-yellow-500 hover:text-yellow-600"> {/* Ajouter un lien vers la page Logout */}
              <PowerIcon className="h-5 w-5" />
            </Link>
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
