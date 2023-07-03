import { Link, useNavigate } from 'react-router-dom';
import { TfiReceipt, TfiUser } from 'react-icons/tfi';
import { FiLogOut } from 'react-icons/fi';
import { useState, useEffect, useContext } from 'react';
import { searchContext } from '../../pages/Home';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { Brand } from '../Brand';
import { Input } from '../Input';
import { Button } from '../Button';
import { Menu } from '../Menu';
import { ItemMenu } from '../ItemMenu';
import defaultDish from '../../../src/assets/dish.svg';
import { Container, ReceiptOrders, Order, Profile, ProfileMenu, ProfileMenuOptions, SearchList } from './styles';

export function Header() {
    const { signOut, user, isAdmin } = useAuth();
    const navigate = useNavigate();

    const avatarUrl = `${api.defaults.baseURL}/files/${user.avatar}`;
    const order = 5;
    const queryWidth = 1050;
    const [search, setSearch] = useState("");
    const [hasSearchPlaceholder, setHasSearchPlaceholder] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
    const [isProfileMenuHidden, setIsProfileMenuHidden] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [filteredSearch, setFilteredSearch] = useState([]);

    const avatarStyle = {
        backgroundImage: user.avatar ? `url(${avatarUrl})` : 'none'
    };

    const [itemSearch, setItemSearch, page] = useContext(searchContext);

    function handleSignOut() {
        navigate("/");
        signOut();
    }

    function handleDish(id) {
        const pageNameAndId = window.location.pathname.split("/");

        navigate(`/dish/${id}`);

        if (pageNameAndId[1] === "dish" && pageNameAndId[2] !== id.toString()) {
            window.location.reload();
        } else {
            document.querySelector("#searchDishes").value = "";
            setSearch("");
        }
    }

    useEffect(() => {
        setHasSearchPlaceholder(!search);
    }, [search]);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);

            if (window.innerWidth >= queryWidth) {
                setIsProfileMenuHidden(false);
            } else {
                setIsProfileMenuHidden(true);
                setIsProfileMenuVisible(false);
                setSearch("");
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (page === "home") {
            setItemSearch(search)
        }

        function filterDishesByNameOrIngredient(searchQuery) {
            searchQuery = searchQuery.toLowerCase();

            var filteredDishes = dishes.filter(function (dish) {
                if (dish.name.toLowerCase().includes(searchQuery)) {
                    return true;
                }

                var foundIngredient = dish.ingredients.find(function (ingredient) {
                    return ingredient.name.toLowerCase().includes(searchQuery);
                });

                return !!foundIngredient;
            });

            return filteredDishes;
        }

        var searchResult = filterDishesByNameOrIngredient(search);
        setFilteredSearch(searchResult);

    }, [search])

    useEffect(() => {
        async function fetchDishes() {
            const response = await api.get(`/dishes?itemSearch=${search}`);

            setDishes(response.data);
        }

        fetchDishes();
    }, [])

    return (
        <Container>
            <Menu />
            <Brand isAdmin={isAdmin} />
            {windowWidth >= queryWidth && (
                <Input
                    id="searchDishes"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Busque por pratos ou ingredientes"
                    searchPlaceholder={hasSearchPlaceholder}
                    value={search}
                >
                    {
                        search && filteredSearch.length > 0 && page !== "home" &&
                        <SearchList>
                            {
                                filteredSearch.map(dish =>
                                    <div key={dish.id} onClick={() => handleDish(dish.id)}>
                                        {
                                            dish.image ? (
                                                <img src={`${api.defaults.baseURL}/files/${dish.image}`} />
                                            ) : (
                                                <img src={defaultDish} />
                                            )
                                        }
                                        <span>{dish.name}</span>
                                    </div>
                                )
                            }
                        </SearchList>
                    }
                    {
                        search && filteredSearch.length === 0 && page !== "home" &&
                        <SearchList><span>Nenhum resultado encontrado!</span></SearchList>
                    }
                </Input>
            )}
            {windowWidth >= queryWidth ? (
                isAdmin ? (
                    <Link to="/add">
                        <Button>
                            Novo prato
                        </Button>
                    </Link>
                ) : (
                    <Button>
                        <TfiReceipt />{`Pedidos (${order})`}
                    </Button>
                )
            ) : (
                isAdmin ? null : (
                    <ReceiptOrders>
                        <TfiReceipt />
                        <Order>
                            {order}
                        </Order>
                    </ReceiptOrders>
                )
            )}
            {windowWidth >= queryWidth && (
                <Profile style={avatarStyle} onClick={() => setIsProfileMenuVisible(!isProfileMenuVisible)}>
                    {
                        !user.avatar && <TfiUser />
                    }
                    <ProfileMenu className={`profile-menu ${isProfileMenuVisible ? 'profile-menu-visible' : 'profile-menu-transition'}`}>
                        <ProfileMenuOptions>
                            <Link to="/profile"><ItemMenu icon={TfiUser} title="Atualizar dados" /></Link>
                            <ItemMenu
                                icon={FiLogOut}
                                title="Sair"
                                onClick={handleSignOut}
                            />
                        </ProfileMenuOptions>
                    </ProfileMenu>
                </Profile>
            )}
        </Container>
    );
}