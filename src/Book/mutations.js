import gql from 'graphql-tag';

export const CREATE_BOOK = gql`
  mutation (
    $writerIds: [ID!]!,
    $title: String!,
    $url: String,
    $yearPublished: String,
    $yearRead: String,
    $wantToRead: Boolean,
    $description: String,
    $portraitimageurl: String,
  ) {
    createBook(
      writerIds: $writerIds,
      title: $title,
      url: $url,
      yearRead: $yearRead,
      wantToRead: $wantToRead,
      yearPublished: $yearPublished,
      description: $description,
      portraitimageurl: $portraitimageurl,
    ) {
      id
      title
      url
      yearPublished
      yearRead
      wantToRead
      description
      portraitimageurl
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation (
    $bookId: ID!
  ) {
    deleteBook(
      id: $bookId
    )
  }
`;

export const UPDATE_BOOK = gql`
  mutation (
    $id: ID!,
    $writerIds: [ID!],
    $title: String!,
    $url: String,
    $yearPublished: String,
    $yearRead: String,
    $wantToRead: Boolean,
    $description: String,
    $portraitimageurl: String,
  ) {
    updateBook(
      id: $id,
      writerIds: $writerIds,
      title: $title,
      url: $url,
      yearPublished: $yearPublished,
      yearRead: $yearRead,
      wantToRead: $wantToRead,
      description: $description,
      portraitimageurl: $portraitimageurl,
    ) {
      id
      title
      url
      yearPublished
      yearRead
      wantToRead
      description
      portraitimageurl
    }
  }
`;
