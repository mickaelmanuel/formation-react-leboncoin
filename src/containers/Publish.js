import React from "react";
import { Input } from "../components/controls/Input";
import { Button } from "../components/controls/Button";
import { Axios } from "../Api";

export class Publish extends React.Component {
  state = {
    isLoading: false,
    error: { value: false, text: "" },
    title: "",
    description: "",
    price: 0,
    images: []
  };

  validateDatas() {
    if (this.state.title === "") return false;
    if (this.state.description === "") return false;
    if (this.state.price === 0) return false;
    return true;
  }

  render() {
    return (
      <div className="content">
        <Input
          name="title"
          type="text"
          placeholder="title"
          value={this.state.title}
          onTextChange={e => {
            this.setState({ title: e.target.value });
          }}
        />

        <Input
          name="description"
          placeholder="description"
          type="text"
          value={this.state.description}
          onTextChange={e => {
            this.setState({ description: e.target.value });
          }}
        />

        <Input
          name="price"
          placeholder="price"
          type="number"
          min={0}
          value={this.state.price}
          onTextChange={e => {
            this.setState({ price: parseInt(e.target.value, 10) });
          }}
        />

        <input
          type="file"
          id="multi"
          onChange={e => {
            const files = Array.from(e.target.files);
            this.setState({ files: files });
          }}
          multiple
        />

        <Button
          onClick={async () => {
            if (!this.validateDatas()) {
              this.setState({
                error: { value: true, text: "Données invalides" }
              });
              return;
            }

            this.setState({ isLoading: true });

            const formData = new FormData();

            this.state.files.forEach((file, i) => {
              formData.append(`file${i}`, file);
            });

            let resultFileUpload = null;
            let pictures = [];
            await Axios.post("/offer/upload", formData, {
              headers: {
                authorization: "Bearer " + this.props.user.token,
                "Content-Type": "multipart/form-data"
              }
            })
              .then(result => {
                this.setState({ isLoading: false });
                resultFileUpload = result.data;
                console.log(result.data);

                Object.keys(resultFileUpload).forEach((fileobj, index) => {
                  let obj = resultFileUpload[fileobj];
                  if (obj.success) {
                    pictures.push(obj.result);
                  }
                });

                console.log("then ", pictures);

                //this.props.history.push("/");
              })
              .catch(error => {
                this.setState({
                  isLoading: false,
                  error: { value: true, text: error.response.data.error }
                });

                pictures = [];
              });

            await Axios.post(
              "/offer/publish",
              {
                title: this.state.title,
                description: this.state.description,
                price: this.state.price,
                pictures: pictures
              },
              {
                headers: {
                  authorization: "Bearer " + this.props.user.token
                }
              }
            )
              .then(result => {
                this.setState({ isLoading: false });
                console.log(result);
                this.props.history.push("/");
              })
              .catch(error => {
                this.setState({
                  isLoading: false,
                  error: { value: true, text: error.response.data.error }
                });
              });
          }}
        >
          Publier l'annonce
        </Button>
        {this.state.error.value ? <p>{this.state.error.text}</p> : null}
        {this.state.loading ? <p>Loading...</p> : null}
      </div>
    );
  }
}
