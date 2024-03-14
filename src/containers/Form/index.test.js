import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);

    await screen.findByText("Nom");
    await screen.findByText("Prenom");
    await screen.findByText("Email");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

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

      // Vérifier si la fonction onSuccess a été appelée
      expect(onSuccess).toHaveBeenCalled();
    });
  });
  describe("and a click is triggered on the submit button", () => {
    it("the error action is called", async () => {
      const onError = jest.fn();
      render(<Form onError={onError} />);


// Cliquer sur le bouton de soumission
fireEvent.click(await screen.findByTestId("button-test-id-submit"));

// Attendre que les messages d'erreur s'affichent
const erreurNom = await screen.findByText("Veuillez saisir votre nom");
const erreurPrenom = await screen.findByText("Veuillez saisir votre prenom");
const erreurEmail = await screen.findByText("Veuillez saisir votre email");
const erreurSelect = await screen.findByText("Veuillez sélectionner");
const erreurMessage = await screen.findByText("Veuillez saisir votre message");

// Vérifier que les messages d'erreur attendus sont affichés
expect(erreurNom).toBeInTheDocument();
expect(erreurPrenom).toBeInTheDocument();
expect(erreurEmail).toBeInTheDocument();
expect(erreurMessage).toBeInTheDocument();

    // Vérifier que la fonction onError est appelée avec le message approprié
    expect(onError).toHaveBeenCalledWith("Veuillez remplir tous les champs");
    
    });
});
});