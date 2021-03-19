import { makeStyles } from "@material-ui/core/styles";


export default makeStyles({
    main: {
        padding: "2vh 4vw",
        
        "@media (min-width: 1366px)": {
            padding: "4vh 3vw",
        },
    },

    mainTitle: {
		color: (props: any) => props.color1,
		fontSize: "2rem",
    },
    
    content: {
		marginTop: "2vh",

		"@media (min-width: 1366px)": {
			marginTop: "4vh",
		},
	},
});