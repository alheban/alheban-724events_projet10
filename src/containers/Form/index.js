import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 900);
  });

const Form = ({ onSuccess, onError }) => {
  // Déclaration de l'état "sending" pour suivre si le formulaire est en cours d'envoi
  const [sending, setSending] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  // Déclaration de l'état local pour stocker les valeurs des champs de formulaire
  const [formValues, setFormValues] = useState({
    nom: "",
    prenom: "",
    type: "",
    email: "",
    message: ""
  });

  // Définition d'une fonction de rappel pour envoyer le formulaire
  const sendContact = useCallback(
    async (evt) => {
      // Empêche le comportement par défaut du formulaire (rechargement de la page)
      evt.preventDefault();

      const { nom, prenom, type, email, message } = formValues;

      const errors = {};
      if (!nom) {
        errors.nom = "Veuillez saisir votre nom";
      }
      if (!prenom) {
        errors.prenom = "Veuillez saisir votre prenom";
      }
      if (!email) {
        errors.email = "Veuillez saisir votre email";
      }
      if (!message) {
        errors.message = "Veuillez saisir votre message";
      }
      if (!type) {
        errors.type = "Veuillez sélectionner";
      }

      // Vérifie si tous les champs sont remplis
      if (!nom || !prenom || !type || !email || !message) {
        setFormErrors(errors);
        // // Si au moins un champ est vide, ne pas envoyer le formulaire
        onError("Veuillez remplir tous les champs");
         return;
      }
      // Met à jour l'état "sending" pour indiquer que le formulaire est en cours d'envoi
      setSending(true);

      // Appel de mockContactApi pour simuler l'envoi du formulaire
      try {
        await mockContactApi(); // Attendez que mockContactApi se termine
        // L'envoi du formulaire est terminé, met à jour l'état "sending"
        setSending(false);
        // Appelle onSuccess, la fonction de rappel passée en tant que propriété, pour indiquer que l'envoi a réussi
        onSuccess();
      } catch (err) {
        // En cas d'erreur lors de l'envoi du formulaire
        // Met à jour l'état "sending" pour indiquer que l'envoi est terminé
        setSending(false);
        // Appelle onError avec l'erreur (err) pour gérer l'erreur
        onError(err);
      }
    },
    // Dépendances de la fonction de rappel pour s'assurer qu'elle est stable entre les rendus
    [onSuccess, onError, formValues]
  );

  // Fonction de gestion de changement de champ
  const handleInputChange = (fieldName, value) => {
    // Met à jour les valeurs des champs de formulaire dans l'état local
    setFormValues(prevValues => ({
      ...prevValues,
      [fieldName]: value
    }));
    // Efface le message d'erreur associé au champ
    setFormErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
  };

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field 
            name="nom" 
            placeholder="Nom" 
            label="Nom" 
            value={formValues.nom}
            error={formErrors.nom} // Utilisation de l'erreur associée
            onChange={(value) => handleInputChange("nom", value)}
          />
          <Field
            name="prenom" 
            placeholder="Prénom" 
            label="Prenom" 
            value={formValues.prenom}
            error={formErrors.prenom} 
            onChange={(value) => handleInputChange("prenom", value)}
          />
          <Select
            name="type"
            selection={["Personel", "Entreprise"]}
            value={formValues.type}
            error={formErrors.type}
            onChange={(value) => handleInputChange("type", value)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field 
            name="email" 
            placeholder="Email" 
            label="Email" 
            value={formValues.email}
            error={formErrors.email}
            onChange={(value) => handleInputChange("email", value)} 
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
          
        </div>
        <div className="col">
          <Field 
            name="message" 
            placeholder="Message" 
            label="Message" 
            type={FIELD_TYPES.TEXTAREA} 
            value={formValues.message}
            error={formErrors.message}
            onChange={(value) => handleInputChange("message", value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
// test 4
