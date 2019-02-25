import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Spinner from 'reactstrap/es/Spinner';

function NewUserForm({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFirstNameOnChange = ({ target }) => {
    setFirstName(target.value);
  };

  const handleLastNameOnChange = ({ target }) => {
    setLastName(target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(firstName, lastName);
    setIsSubmitting(false);
    setFirstName('');
    setLastName('');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>
          First Name
        </Label>
        <Input placeholder="Adam" value={firstName} onChange={handleFirstNameOnChange} required />
      </FormGroup>
      <FormGroup>
        <Label>
          Last Name
        </Label>
        <Input placeholder="Jones" value={lastName} onChange={handleLastNameOnChange} required />
      </FormGroup>
      {isSubmitting ? (
        <FormGroup style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color="success" type="grow" />
          <Spinner color="primary" type="grow" />
          <Spinner color="danger" type="grow" />
        </FormGroup>
      ) : (
        <FormGroup>
          <Button block outline type="submit" color="primary">
            Submit
          </Button>
        </FormGroup>
      )}
    </Form>
  )
}

export default NewUserForm;
