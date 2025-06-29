import cake_cheeseCake from "../assets/cake/cake_cheeseCake.jpg";
import cake_icebox from "../assets/cake/cake_icebox.jpg";
import cake_redVelvet from "../assets/cake/cake_redVelvet.jpg";
import cake_straeberryRIngDIngDoCake from "../assets/cake/cake_straeberryRIngDIngDoCake.jpg";
import cake_strawberryChocolateCake from "../assets/cake/cake_strawberryChocolateCake.jpg";
import cake_tiramisucake from "../assets/cake/cake_tiramisucake.jpg";

export function getCakeImage(CakeId) {
  switch (CakeId) {
    case 1:
      return cake_cheeseCake;
    case 2:
      return cake_icebox;
    case 3:
      return cake_redVelvet;
    case 4:
      return cake_straeberryRIngDIngDoCake;
    case 5:
      return cake_strawberryChocolateCake;
    case 6:
      return cake_tiramisucake;
    default:
      return null;
  }
}
