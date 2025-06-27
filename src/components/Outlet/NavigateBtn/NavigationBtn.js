import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import ApIcon from "components/ApIcon/ApIcon";
import { faBagShopping, faBookBookmark, faSeedling, faTree } from "@fortawesome/free-solid-svg-icons";
import styles from "./NavigationBtn.module.scss";

const icons = { grow: faSeedling, garden: faTree, shop: faBagShopping, album: faBookBookmark };
const colors = { grow: "var(--grow)", garden: "var(--garden)", shop: "var(--shop)", album: "var(--album)" };
const navKeys = ["grow", "garden", "shop", "album"];
const defaultNavPos = { top: 35, left: 35 };
const radius = 70;

const NavigationBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Icon state
  const [front, setFront] = useState({ icon: null, color: "" });
  const [back, setBack] = useState({ icon: null, color: "" });

  // Flip state
  const [nextLoc, setNextLoc] = useState(location.pathname.split("/")[1]);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    // First time load page
    if (front.icon === null) {
      setFront({ icon: icons[nextLoc], color: colors[nextLoc] });
      return;
    }

    // On location change
    setIsFlipping(true);
    setBack({ icon: icons[nextLoc], color: colors[nextLoc] });
    navigate(`/${nextLoc}`);
  }, [nextLoc]);

  useEffect(() => {
    if (back.icon === null) return;
    // After flipping - reverse faces
    const timer = setTimeout(() => {
      setFront(back);
      setIsFlipping(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [back]);

  // Open - Close navigation
  const [isOpen, setIsOpen] = useState(false);
  const smallNavPosition = useMemo(() => {
    // Unopen case
    if (!isOpen) return Object.fromEntries(navKeys.map((key) => [key, { ...defaultNavPos }]));

    // Open case
    const startAngle = 0; // 0 right
    const endAngle = Math.PI / 2; // 90 down

    const keysToPlace = navKeys.filter((key) => key !== nextLoc);
    const totalPoints = keysToPlace.length;
    const angleStep = (endAngle - startAngle) / (totalPoints - 1);

    return Object.fromEntries(
      navKeys.map((key) => {
        if (key === nextLoc) {
          return [key, { ...defaultNavPos }];
        }

        const index = keysToPlace.indexOf(key);
        const angle = startAngle - index * angleStep;
        const x = Math.cos(angle) * radius;
        const y = -Math.sin(angle) * radius;

        return [key, { left: x + 35, top: y + 35 }];
      })
    );
  }, [isOpen, nextLoc]);

  const navRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={navRef}
      className={clsx(styles.container, { [styles.flipped]: isFlipping })}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.inner}>
        <div className={clsx(styles.face, styles.front)} style={{ borderColor: front.color }}>
          <ApIcon icon={front.icon || faSeedling} color={front.color} size={28} />
        </div>
        <div className={clsx(styles.face, styles.back)} style={{ borderColor: back.color }}>
          <ApIcon icon={back.icon || faSeedling} color={back.color} size={28} />
        </div>
      </div>
      <div className={styles.hidder} />
      {navKeys.map((nav) => (
        <div
          key={nav}
          className={styles.nav}
          style={{ left: smallNavPosition[nav].left, top: smallNavPosition[nav].top, backgroundColor: colors[nav] }}
          onClick={() => setNextLoc(nav)}
        >
          <ApIcon icon={icons[nav]} color="white" size={20} />
        </div>
      ))}
    </div>
  );
};

export default NavigationBtn;
