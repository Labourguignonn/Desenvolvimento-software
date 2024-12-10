import './stylefiltroidade.css'

function Filtroidade(){

    return (
        <div class="central">
            <div>
                <h1>Restrição de Idade</h1>
            <div class="skip">
                <button>Pular</button>
            </div>
            </div>
                <div class="container">
        <div class="row">
            <button class="button-option">L</button>
            <button class="button-option">Classificação Livre</button>
        </div>
        <div class="row">
            <button class="button-option">10</button>
            <button class="button-option">Não recomendado p/ menores de 10 anos</button>
        </div>
        <div class="row">
            <button class="button-option">12</button>
            <button class="button-option">Não recomendado p/ menores de 12 anos</button>
        </div>
        <div class="row">
            <button class="button-option">14</button>
            <button class="button-option">Não recomendado p/ menores de 14 anos</button>
        </div>
        <div class="row">
            <button class="button-option">16</button>
            <button class="button-option">Não recomendado p/ menores de 16 anos</button>
        </div>
        <div class="row">
            <button class="button-option">18</button>
            <button class="button-option">Não recomendado p/ menores de 18 anos</button>
        </div>
    </div>
    <div>
        <button class="arrow-button">➜</button>
    </div>
        </div>
    )

}

export default Filtroidade