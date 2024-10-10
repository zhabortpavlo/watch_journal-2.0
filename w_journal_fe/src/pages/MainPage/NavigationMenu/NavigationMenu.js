import './NavigationMenu.css';

const NavigationMenu = () => {
    return (
        <nav className="nav">
        <ul className="nav-list">
            <li className="nav-item">Movies</li>
            <li className="nav-item">Series</li>
            <li className="nav-item">Games</li>
            <li className="nav-item">Anime</li>
            <li className="nav-item">Books</li>
        </ul>
    </nav>
    )
}

export default NavigationMenu;