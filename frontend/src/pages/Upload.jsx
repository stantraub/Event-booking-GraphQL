import React from "react";
import Dropzone from "react-dropzone";
import moment from "moment";
import { graphql } from "react-apollo";
import { gql } from 'apollo-boost'
import { flowRight } from 'lodash'
import axios from 'axios'

class Upload extends React.Component {
  state = {
    name: "",
    file: null
  };

  handleFile(e) {
      this.setState({file: e.currentTarget.files[0]})
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    await axios.put(signedRequest, file, options);
  };

  formatFilename = filename => {
    const date = moment().format("YYYYMMDD");
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
    return newFilename.substring(0, 60);
  };

  submit = async (e) => {
    e.preventDefault()
    const { name, file } = this.state;
    const response = await this.props.s3Sign({
      variables: {
        filename: this.formatFilename(file.name),
        filetype: file.type
      }
    });

    const { signedRequest, url } = response.data.signS3;
    await this.uploadToS3(file, signedRequest);

    const graphqlResponse = await this.props.createChampion({
      variables: {
        name,
        pictureUrl: url
      }
    });

    this.props.history.push(
      `/champion/${graphqlResponse.data.createChampion.id}`
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input name="name" onChange={this.onChange} value={this.state.name} />
          <input
            type="file"
            className="upload-file-input"
            onChange={this.handleFile.bind(this)}
          />
          <input type="submit" className="modal-upload-btns" value="Share" />
        </form>
      </div>
    );
  }
}


const s3SignMutation = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;

export default flowRight(
  graphql(s3SignMutation, { name: "s3Sign" })
)(Upload);
