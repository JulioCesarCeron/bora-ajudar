import React, { Component } from 'react'
import base from './base';

class AdminCampanhas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            campanhas: {}
        }

        this.renderCampanha = this.renderCampanha.bind(this);
        this.removeCampanha = this.removeCampanha.bind(this);
        this.handleSave = this.handleSave.bind(this)
    }

    componentDidMount() {
        base.syncState('campanhas', {
            context: this,
            state: 'campanhas',
            asArray: false
        })
    }

    removeCampanha(key) {
        base.remove('campanhas/' + key, err => {
            console.log(err)
        })
    }

    renderCampanha(key, campanha) {
        return (
            <li key={key} >
            {campanha.nome}
            <button onClick={() => 1} >Editar</button>
            <button onClick={() => this.removeCampanha(key)} >Remover</button>
            </li>
        )
    }

    handleSave() {
        const nome = this.nome.value
        const descricao = this.descricao.value
        const tipo = this.state.tipo
        const comoDoar = this.state.tipo === 'produtos' ? this.comoDoar.value : null
        const meta = this.state.tipo === 'doacao' ? this.meta.value : null
        const doado = this.state.tipo === 'doacao' ? this.doado.value : null

        base.push('campanhas', {
            data: {nome, descricao, tipo, comoDoar, meta, doado},
            then: err => {
                if(!err){
                    this.nome.value = ''
                    this.descricao.value = ''
                    this.setState({tipo: ''})
                    this.subTitulo.value = ''
                    if (this.meta) {
                        this.meta.value = ''
                    }
                    if (this.doado) {
                        this.doado.value = ''
                    }
                    if (this.comoDoar) {
                        this.comoDoar.value = ''
                    }
                } else {
                    console.log('err', err)
                }
            }
        })
    }

    render(){
        return (
            <div>
                <h1>Campanhas</h1>
                <h2>Nova Campanha</h2>
                Campanha: <input type='text' ref={ ref=> this.nome = ref} />
                Sub-título: <input type='text' ref={ ref=> this.subTitulo = ref} />
                Descrição: <textarea ref={ref => this.descricao = ref} ></textarea>
                Tipo: <br/><input type='radio' name='tipo' onClick={() => this.setState({tipo: 'doacao'}) } />Doação <br/>
                           <input type='radio' name='tipo' onClick={() => this.setState({tipo: 'produtos'}) } />Produtos <br/>
                <br/>
                { this.state.tipo === 'doacao' && <div>
                    <h4>Doação</h4>
                    Meta: <input type="text" ref={ ref => this.meta = ref } />
                    Doado: <input type="text" ref={ ref => this.doado = ref } defaultValue={0} />
                </div> }
                { this.state.tipo === 'produtos' && <div>
                    <h4>Produtos</h4>
                    Como doar: <input type="text" ref={ref => this.comoDoar = ref } />
                </div> }
                <button onClick={this.handleSave} > Salvar nova campanha</button>
                <ul>
                    {
                        Object.keys(this.state.campanhas)
                        .map(key => this.renderCampanha(key, this.state.campanhas[key]))
                    }
                </ul>
            </div>
        )
    }
}

export default AdminCampanhas