import { fireEvent, render, screen,} from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prenom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);

      // Remplir les champs
      fireEvent.change(await screen.findByLabelText("Nom"), {
        target: { value: "John" },
      });
      fireEvent.change(await screen.findByLabelText("Prenom"), {
        target: { value: "Doe" },
      });
      fireEvent.change(await screen.findByLabelText("Email"), {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(await screen.findByLabelText("Message"), {
        target: { value: "Ceci est un message de test." },
      });

      // Sélectionner "Personel" dans la liste déroulante
      fireEvent.click(screen.getByTestId("collapse-button-testid-type")); // Ouvre la liste déroulante
      fireEvent.click(screen.getByText("Personel")); // Sélectionne "Personel"

      // Cliquer sur le bouton de soumission
      fireEvent.click(await screen.findByTestId("button-test-id-submit"));

      // Attendre que l'état "En cours" soit affiché
      await screen.findByText("En cours");
      // Attendre que l'état "Envoyer" soit affiché
      await screen.findByText("Envoyer");

      // Attendre que le message "Message envoyé !" soit affiché
      await screen.findByText("Message envoyé !");
    });
  });
});


