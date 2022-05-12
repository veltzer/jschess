<%!
    import config.project
    import user.personal
    import config.version
%>${config.project.project_name}
${'=' * len(config.project.project_name)}

version: ${config.version.version_str}

description: ${config.project.project_description}

${config.project.project_long_description}

	${user.personal.personal_origin}, ${config.project.project_copyright_years}
