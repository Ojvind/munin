import gql from 'graphql-tag';

export const CREATE_WRITER = gql`
  mutation($name: String!, $surname: String!, $homepage: String, $nationality: String, $description: String) {
    createWriter(name: $name, surname: $surname, homepage: $homepage, nationality: $nationality, description: $description) {
      id
      name
      surname
      homepage
      portraitimageurl
      nationality
      description
    }
  }
`;

export const UPDATE_WRITER = gql`
mutation ($id: ID!, $name: String!, $surname: String!, $homepage: String, $portraitimageurl: String, $nationality: String, $description: String) {
  updateWriter (id: $id, name: $name, surname: $surname, homepage: $homepage, portraitimageurl: $portraitimageurl, nationality: $nationality, description: $description) {
      name
      surname
      homepage
      portraitimageurl
      nationality
      description
    }
  }
`;

export const DELETE_WRITER = gql`
  mutation (
    $id: ID!
  ) {
    deleteWriter (
      id: $id
    ) 
  }
`;
