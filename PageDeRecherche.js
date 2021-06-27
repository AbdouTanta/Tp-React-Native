import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

type Props = {};

function urlPourRequete(valeur) {
  return 'https://restcountries.eu/rest/v2/name/' + valeur;
}

export default class PageDeRecherche extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      requeteDeRecherche: 'morocco',
      estEnChargement: false,
      message: '',
    };
  }

  _auChangementDeLaRecherche = event => {
    this.setState({requeteDeRecherche: event.nativeEvent.text});
  };

  _executerRequete = requete => {
    console.log(requete);
    this.setState({estEnChargement: true});
  };

  _gererLaReponse = reponse => {
    this.setState({estEnChargement: false, message: ''});
    this.props.navigation.navigate('Resultats', {listings: reponse});
    console.log(this.props.route);
  };

  _auDemarrageDeLaRecherche = () => {
    const requete = urlPourRequete(this.state.requeteDeRecherche);
    this._executerRequete(requete);
    fetch(requete)
      .then(reponse => reponse.json())
      .then(json => this._gererLaReponse(json))
      .catch(error =>
        this.setState({
          estEnChargement: false,
          message: "Quelque chose de mauvais s'est produit" + error,
        }),
      );
  };

  render() {
    const indicateurDeChargement = this.state.estEnChargement ? (
      <ActivityIndicator size="large" color="0000ff" />
    ) : null;
    return (
      <View style={styles.conteneur}>
        <Text style={styles.description}>Rechercher des pays à explorer !</Text>
        <Text style={styles.description}>Rechercher par nom</Text>
        <View style={styles.fluxDroite}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.requeteEntree}
            value={this.state.requeteDeRecherche}
            placeholder="Rechercher par nom de pays"
            onChange={this._auChangementDeLaRecherche}
          />
          <Button
            onPress={this._auDemarrageDeLaRecherche}
            color="#48AAEC"
            title="Démarrer"
          />
        </View>
        <Image source={require('./ressources/pays.jpg')} style={styles.image} />
        {indicateurDeChargement}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
  },
  conteneur: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },
  fluxDroite: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  requeteEntree: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48AAEC',
    borderRadius: 8,
    color: '#48AAEC',
  },
  image: {
    width: 220,
    height: 140,
  },
});
